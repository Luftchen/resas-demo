## Docker 環境での起動

1. ビルド
   docker build -t next .
2. 起動
   docker run -p 3000:3000 next

## ローカル環境での起動

npm run dev

## 未対応箇所

・docker-compose.yaml ファイルの作成  
・Docker 環境のホットリロード対応  
・環境変数（.env ファイル）からの定数読み込み
