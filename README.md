# README

1. Fork
2. git clone
3. 更改專案名稱

## 初始化

### Initialize

```
git remote add upstream https://github.com/ALPHACamp/forum-express-grading.git  # 建立上游連線

### 切換環境

```

export NODE_ENV=test # 切換到測試環境，如果在等號後加其他的字串，則會切到其他的環境
echo $NODE_ENV # 印出目前使用的環境

```

### 執行測試
```

npm run test

```

<<<<<<< HEAD
## 下載作業規格
以 A17 為例

```

git checkout -b A17 # 開新分支
git merge origin/A17-test # 下載作業規格
npm run test # 直到綠燈全亮

git add .
git commit -m "...."

```

## 繳交作業

```

git push origin A17 # 上傳本地進度
||||||| c386de7

- 使用者可以註冊/登入/登出網站
- 使用者可以在瀏覽所有餐廳與個別餐廳詳細資料
- 在瀏覽所有餐廳資料時，可以用分類篩選餐廳
- 使用者可以對餐廳留下評論
- 使用者可以收藏餐廳
- 使用者可以查看最新上架的 10 筆餐廳
- 使用者可以查看最新的 10 筆評論
- 使用者可以編輯自己的個人資料
- 使用者可以查看自己評論過、收藏過的餐廳
- 使用者可以追蹤其他的使用者

## 共用帳號

請一律設定一個共用的 root user
root@example.com，登入密碼 12345678
