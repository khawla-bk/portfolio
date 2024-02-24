pipeline {
    agent any
    stages {
        stage('Build Maven') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'khawla-bk', url: 'https://github.com/khawla-bk/portfolio.git']]])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t kindest/node:v1.23.4 .'
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u kbenkadida006 -p ${dockerhubpwd}'
                    }
                    sh 'docker push kindest/node:v1.23.4'
                }
            }
        }
        stage('Deploy App on k8s') {
            steps {
                sshagent(credentials: ['k8s']) {
                    sh "scp -o StrictHostKeyChecking=no nodejsapp.yaml kind-kind@127.0.0.1:/home/k-irwise/vagrant-test"
                    script {
                        try {
                            sh "ssh -o StrictHostKeyChecking=no kind-kind@127.0.0.1 'cd /home/k-irwise/vagrant-test && kubectl apply -f nodejsapp.yaml'"
                        } catch (Exception e) {
                            echo "Error deploying app: ${e.getMessage()}"
                            error("Deployment failed")
                        }
                    }
                }
            }
        }
    }
}