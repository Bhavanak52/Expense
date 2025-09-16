    pipeline {
        // This 'agent' block is the most important change.
        // It tells Jenkins to build and run the pipeline inside a temporary Docker container
        // based on the Dockerfile.jenkins we just created.
        agent {
            dockerfile {
                filename 'Dockerfile.jenkins'
            }
        }

        environment {
            DOCKERHUB_USERNAME = 'bhavanakajampady'
            GITHUB_REPO = 'Bhavanak52/expense-tracker-app' // Corrected repo name
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
                        // This 'sh' command will now work because our agent has Node.js/npm
                        sh 'npm install'
                    }
                }
            }

            stage('Build Frontend') {
                steps {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }

            stage('Build Docker Images') {
                steps {
                    // These commands work because our agent has Docker installed
                    sh "docker build -t ${env.DOCKERHUB_USERNAME}/expense-tracker-backend:latest ./backend"
                    sh "docker build -t ${env.DOCKERHUB_USERNAME}/expense-tracker-frontend:latest ./frontend"
                }
            }

            stage('Push Docker Images to Docker Hub') {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh "docker push ${env.DOCKERHUB_USERNAME}/expense-tracker-backend:latest"
                        sh "docker push ${env.DOCKERHUB_USERNAME}/expense-tracker-frontend:latest"
                    }
                }
            }

            stage('Deploy Application') {
                steps {
                    // This now works because our agent has docker-compose installed
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
    
