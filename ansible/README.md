ansible-playbook testenv.yml -i hosts.yml

ansible-playbook docker_create_image.yml -i hosts.yml
ansible-playbook docker_run.yml -i hosts.yml

ansible-playbook bk_question_svc_create_img.yml -i hosts.yml --extra-vars "version=0.0.1"
ansible-playbook bk_question_svc_create_img.yml -i hosts.yml -e "version=0.0.1"

ansible-playbook bk_auth_svc_create_img.yml -i hosts.yml --extra-vars "version=0.0.1"

ansible-playbook bk_gateway_create_img.yml -i hosts.yml -e "version=0.0.2"
ansible-playbook bk_gateway_create_img.yml -i hosts.yml -e "version=0.0.1"


ansible-playbook fr_copy_app.yml -i hosts.yml

TODO:
1. przekopiować pliki do tmp lub pobrać z git
2. wykonc docker build z parametrami module i version
3. usun pliki tymczasowe