pipeline {
    agent any

    environment {
        DOCKER_NAMESPACE = 'bhavanakajampady'         // ✅ Your DockerHub username
        BACKEND_IMAGE = 'expense-backend'
        FRONTEND_IMAGE = 'expense-frontend'
        TAG = "${env.BUILD_NUMBER}"                   // unique tag per build
    }

    stages {
        stage('Install & Build') {
            steps {
                echo "Installing dependencies and building project..."
                dir('backend') {
                    bat 'npm install'
                }
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                script {
                    dir('backend') {
                        if (fileExists('test')) {
                            bat 'npm test'
                        } else {
                            echo "No backend tests found, skipping."
                        }
                    }
                    dir('frontend') {
                        if (fileExists('src\\__tests__')) {
                            bat 'npm test -- --watchAll=false'
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
                bat "docker build -t %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:%TAG% ./backend"
                bat "docker build -t %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:%TAG% ./frontend"
            }
        }

        stage('Docker Push') {
            steps {
                echo "Pushing images to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"

                    // Push backend
                    bat "docker push %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:%TAG%"
                    bat "docker tag %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:%TAG% %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:latest"
                    bat "docker push %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:latest"

                    // Push frontend
                    bat "docker push %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:%TAG%"
                    bat "docker tag %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:%TAG% %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:latest"
                    bat "docker push %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying with Docker Compose..."
                bat "docker compose down || exit 0"
                bat "docker compose up -d"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
