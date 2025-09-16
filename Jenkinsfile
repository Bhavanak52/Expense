pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'bhavanakajampady'
        GITHUB_REPO = 'Bhavanak52/expense-tracker-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    // --- Corrected from bat to sh ---
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // --- Corrected from bat to sh ---
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // --- Corrected from bat to sh ---
                sh "docker build -t ${env.DOCKERHUB_USERNAME}/expense-tracker-backend:latest ./backend"
                sh "docker build -t ${env.DOCKERHUB_USERNAME}/expense-tracker-frontend:latest ./frontend"
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    // --- Corrected from bat to sh ---
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                    sh "docker push ${env.DOCKERHUB_USERNAME}/expense-tracker-backend:latest"
                    sh "docker push ${env.DOCKERHUB_USERNAME}/expense-tracker-frontend:latest"
                }
            }
        }

        stage('Deploy Application') {
            steps {
                // --- Corrected from bat to sh ---
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}