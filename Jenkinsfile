pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'rakesh2398'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/chai-kafe-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/chai-kafe-frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build-Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test Backend') {
    steps {
        dir('backend') {
            sh 'mvn clean package -DskipTests'
        }
    }
}
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=sonar \
                        -Dsonar.projectName="Chai Kafe DevOps Project" \
                        -Dsonar.sources=backend/src/main/java,frontend/src \
                        -Dsonar.java.binaries=backend/target/classes
                        """
                    }
                }
            }
        }
        stage('Trivy File Scan') {
            steps {
                sh 'trivy fs . --format table -o trivy-fs-report.html'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image $BACKEND_IMAGE --format table -o trivy-backend-image-report.html'
                sh 'trivy image $FRONTEND_IMAGE --format table -o trivy-frontend-image-report.html'
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $BACKEND_IMAGE'
                sh 'docker push $FRONTEND_IMAGE'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'trivy-*.html', allowEmptyArchive: true
        }
    }
}
