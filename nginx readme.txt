sudo apt install nginx

# Iniciar el servidor
sudo service nginx start

# Parar el servidor
sudo service nginx stop

# Editar la conexiÃ³n
sudo nano /etc/nginx/sites-available/default

# Agregar:
location /api/user {
    proxy_pass http://localhost:3000
}

location /api/auth {
    proxy_pass http://localhost:3000
}

location /api/post {
    proxy_pass http://localhost:3002
}

# Salvamos, y reinciamos nginx
sudo service nginx restart
