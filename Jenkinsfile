pipeline {
    agent any

    environment {
        DOCKER_NAMESPACE = 'bhavanakajampady'         // ✅ your DockerHub username
        BACKEND_IMAGE = 'expense-backend'
        FRONTEND_IMAGE = 'expense-frontend'
        TAG = "${env.BUILD_NUMBER}"                   // unique tag per build
    }

    stages {
        stage('Install & Build') {
            steps {
                echo "Installing dependencies and building project..."
                dir('backend') {
                    sh 'npm ci'
                }
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                script {
                    dir('backend') {
                        if (fileExists('test')) {
                            sh 'npm test'
                        } else {
                            echo "No backend tests found, skipping."
                        }
                    }
                    dir('frontend') {
                        if (fileExists('src/__tests__')) {
                            sh 'npm test -- --watchAll=false'
                        } else {
                            echo "No frontend tests found, skipping."
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker images..."
                sh "docker build -t ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:${TAG} ./backend"
                sh "docker build -t ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:${TAG} ./frontend"
            }
        }

        stage('Docker Push') {
            steps {
                echo "Pushing images to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    // Push backend
                    sh "docker push ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:${TAG}"
                    sh "docker tag ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:${TAG} ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:latest"
                    sh "docker push ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:latest"
                    // Push frontend
                    sh "docker push ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:${TAG}"
                    sh "docker tag ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:${TAG} ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:latest"
                    sh "docker push ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying with Docker Compose..."
                sh "docker compose down || true"
                sh "docker compose up -d"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
