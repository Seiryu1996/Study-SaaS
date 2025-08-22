.PHONY: up down web ngrok dev

up:
	docker compose up

down:
	docker compose down

web:
	docker compose exec app ash

ngrok:
	ngrok http 3000

dev: up
	@echo "Starting development environment..."
	@echo "Run 'make ngrok' in another terminal for Clerk authentication"
	docker compose logs -f app