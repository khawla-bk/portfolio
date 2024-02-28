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
                    withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'DOCKERHUB_PWD')]) {
                        sh "echo ${DOCKERHUB_PWD} | docker login -u kbenkadida006 --password-stdin"
                        sh "docker push ${env.DOCKER_IMAGE}"
                    }
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
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sq1') {
                    sh 'sonar-scanner -Dsonar.projectKey=YourProjectKey -Dsonar.sources=. -Dsonar.host.url=http://192.168.1.16:9000 -Dsonar.login=squ_66bacb76ba7a0ba0bb014aed5f1c7e6ee73882c7'
                }
            }
        }
    }
}
