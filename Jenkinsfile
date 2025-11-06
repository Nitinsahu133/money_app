pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages{
        stage('checkout'){
            steps{
                git branch: "main", url: "https://github.com/Nitinsahu133/money_app.git"
            }
        }

        stage("build & deploy"){
            steps{
                script{
                    sh 'docker compose down || true'
                    sh 'docker compose up --build -d'
                }
            }
        }
    }

    post{
        always{
            sh 'docker ps'
        }
    }
}