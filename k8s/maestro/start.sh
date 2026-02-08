#!/usr/bin/env bash

kubectl create namespace kamilmucik-lkequiz-maestro
kubectl config set-context --current --namespace=kamilmucik-lkequiz-maestro

kubectl apply -f auth-db.yaml
kubectl apply -f question-db.yaml

sleep 15
kubectl apply -f auth-svc.yaml
kubectl apply -f question-svc.yaml
kubectl apply -f gateway-svc.yaml
kubectl apply -f frontend-svc.yaml


sleep 5

kubectl get all