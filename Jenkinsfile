pipeline {
    agent any
    environment {
    DOCKER_BUILDKIT = '0'
}
    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning GitHub Repository'
                git branch: 'main', url: 'https://github.com/rakeshkumar2398/ArgoCd-Project.git'
            }
        }

        stage('Build Backend Artifact') {
            steps {
                echo 'Building Backend Artifact'

                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                echo 'Running SonarQube Scan'

                dir('backend') {
                    withSonarQubeEnv('sonar') {
                        sh '''
                            mvn sonar:sonar \
                            -Dsonar.java.binaries=target/classes \
                            -DskipTests
                        '''
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Building Frontend Docker Image'
                sh 'docker build -t rakesh2398/frontend:${BUILD_NUMBER} ./frontend'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo 'Building Backend Docker Image'
                sh 'docker build -t rakesh2398/backend:${BUILD_NUMBER} ./backend'
            }
        }

        stage('Scan Docker Images using Trivy') {
            steps {
                echo 'Scanning Docker Images using Trivy'
                sh 'trivy image rakesh2398/frontend:${BUILD_NUMBER}'
                sh 'trivy image rakesh2398/backend:${BUILD_NUMBER}'
            }
        }

        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker Images to DockerHub'

                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_TOKEN')]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login -u rakesh2398 --password-stdin
                        docker push rakesh2398/frontend:${BUILD_NUMBER}
                        docker push rakesh2398/backend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                echo 'Updating Kubernetes Manifest Image Tags'

                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.email "rakesh2398@gmail.com"
                        git config user.name "rakesh2398"

                        sed -i "s|image: rakesh2398/frontend:.*|image: rakesh2398/frontend:${BUILD_NUMBER}|g" k8s/frontend-deployment.yaml
                        sed -i "s|image: rakesh2398/backend:.*|image: rakesh2398/backend:${BUILD_NUMBER}|g" k8s/backend-deployment.yaml

                        git add k8s/frontend-deployment.yaml k8s/backend-deployment.yaml
                        git commit -m "Updated image tags to build ${BUILD_NUMBER}" || echo "No changes to commit"

                        git push https://$GITHUB_TOKEN@github.com/rakeshkumar2398/ArgoCd-Project.git HEAD:main
                    '''
                }
            }
        }
    }
}
