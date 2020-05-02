FROM nginx:alpine
COPY dist* /usr/share/nginx/html/
ADD start-testbefund-pwa.sh /
RUN chmod +x /start-testbefund-pwa.sh
CMD ["/start-testbefund-pwa.sh"]
