# VMUTE
Проектная работа по дисциплине "Технологии разработки программных приложений".

О проекте:

Проект "Социальная сеть" направлен на создание автоматизированной
платформы для социального взаимодействия пользователя. Платформа
должна предоставить удобный интерфейс для обмена информацией,
поддержать создание персональных профилей, а также обеспечить
функционал групповых обсуждений и мессенджера для коммуникации между
участниками. Основное внимание уделяется созданию простого и легкого в
использовании интерфейса с минималистичным дизайном, способствующим
комфортной социальной интеракции и обмену информацией. Помимо этого,
пользователи могут добавлять друзей и просматривать их посты.

Зависимости проекта:
```
dependencies {
	implementation 'io.jsonwebtoken:jjwt-api:0.12.3'
	implementation 'io.jsonwebtoken:jjwt-impl:0.12.3'
	implementation 'io.jsonwebtoken:jjwt-jackson:0.12.3'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-rest'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	runtimeOnly 'org.postgresql:postgresql'
	testImplementation 'org.springframework.security:spring-security-test'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

Для запуска приложения необходимо ввести:
```
docker-ccompose up
```
