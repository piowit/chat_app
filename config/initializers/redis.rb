REDIS = Redis.new(url: ENV.fetch("REDIS_URL") { "redis://localhost:16381/1" })
