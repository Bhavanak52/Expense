pipeline {
    agent any

    environment {
        IMAGE_NAME = 'expense-tracker'
        TAG = 'latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'mtech',
                    url: 'https://gitlab.com/bhavanak52-group/expense-tracker.git',
                    branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo "Building project..."
                // Optional: Add npm install or build commands if it's a frontend
                // sh 'npm install'
                // sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        // Optional: Add DockerHub Push if needed later
        // stage('Docker Push') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        //             sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
        //             sh "docker tag ${IMAGE_NAME}:${TAG} $DOCKER_USER/${IMAGE_NAME}:${TAG}"
        //             sh "docker push $DOCKER_USER/${IMAGE_NAME}:${TAG}"
        //         }
        //     }
        // }
    }
}
