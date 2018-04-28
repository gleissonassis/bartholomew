FROM alpine

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    apk add --update bash && rm -rf /var/cache/apk/* && \
    mkdir /app && \

WORKDIR /app

COPY . .

RUN npm i && \
    chmod +x start.sh

EXPOSE 5000

CMD ["/app/start.sh"]
