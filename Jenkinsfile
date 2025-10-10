pipeline {
    agent { label 'vinod' }
    
    stages {
        stage('Code') {
            steps {
                echo "Cloning repository..."
                git url: 'https://github.com/Nitinsahu133/money_app.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                echo "🔨 Building Docker images..."
                sh "docker build -t money_backend:latest ./backend"
                sh "docker build -t money_frontend:latest ./frontend"
            }
        }
        stage('Push to DockerHub') {
            steps {
                echo "This is pushing the image to Docker Hub"
                withCredentials([usernamePassword('credentialsId':"dockerHubCred",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker image tag money_backend:latest ${env.dockerHubUser}/money_backend:latest"
                    sh "docker image tag money_frontend:latest ${env.dockerHubUser}/money_frontend:latest"
                    sh "docker push ${env.dockerHubUser}/money_backend:latest"
                    sh "docker push ${env.dockerHubUser}/money_frontend:latest"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "🚀 Starting Docker containers..."
                sh "docker-compose up --build -d"
            }
        }
    }
}
