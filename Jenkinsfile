pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'kindest/node:v1.23.4' 
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'khawla-bk', url: 'https://github.com/khawla-bk/portfolio.git']]])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'dockerhubpwd')]) {
                        sh "echo ${dockerhubpwd} | docker login -u kbenkadida006 --password-stdin"
                    }
                    // Push the built image to the Docker registry
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }
        stage('Deploy App on k8s') {
            steps {
                script {
                    sh "kubectl apply -f app_deploy.yml"
                }
            }
        }
    }
}
