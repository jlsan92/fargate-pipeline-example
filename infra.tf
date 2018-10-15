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

  services = {
    api = {
      registry_retention_days = 15
      logs_retention_days = 14

      task_definition = "api.json"
      task_tag        = "latest"
      cpu             = "256"
      memory          = "512"
      replicas        = 2
    }
  }
}
