from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 【关键】配置 CORS，允许所有来源（开发阶段）
# 小程序的域名在开发工具中通常是 https://servicewechat.com
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #生产环境要指定具体域名，开发期可用 *
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/api/get_weather")
def get_weather(city: str = "北京"):
    # 模拟返回天气数据
    return {
        "city": city,
        "temperature": 25,
        "condition": "晴朗",
        "source": "FastAPI Mock Data"
    }

@app.post("/api/login")
def login(data: dict):
    # 接收小程序发来的登录信息
    username = data.get("username")
    return {"code": 200, "msg": f"用户 {username} 登录成功", "token": "fake_token_12345"}