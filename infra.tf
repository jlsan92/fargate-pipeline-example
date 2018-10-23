terraform {
  required_version = "~> 0.11.8"
}

provider "aws" {
  version = "~> 1.36.0"
  region  = "us-east-1"
  profile = "playground"
}

module "fargate" {
  source = "../fargate-backend"

  name = "fargate-example"

  repo_name  = "fargate-pipeline-example"
  repo_owner = "jlsan92"

  # development_mode = true

  services = {
    api = {
      task_definition = "api.json"
      container_port  = 3000
      cpu             = "256"
      memory          = "512"
      replicas        = 3

      registry_retention_count = 15
      logs_retention_days      = 14
    }
  }
}
