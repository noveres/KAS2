# KAS3 資產管理系統說明文件

## 目錄

1. [系統概述](#系統概述)
2. [角色權限](#角色權限)
3. [路由結構](#路由結構)
4. [頁面職責](#頁面職責)
5. [技術架構](#技術架構)

## 系統概述

KAS3 是一套完整的企業資產管理系統，提供資產生命週期管理、盤點、報表等功能。系統採用 Angular 框架開發，具有響應式設計，支援多種裝置訪問。

## 角色權限

系統設計了多種使用者角色，每種角色擁有不同的權限範圍：

### 系統管理員 (Admin)

- 擁有所有模組的所有權限 (create, read, update, delete, export)
- 負責系統設定、使用者管理和權限配置

### 資產管理員 (AssetManager)

- Dashboard: read
- AssetManagement: 所有子模組的所有權限
- MasterData: 所有子模組的 read 權限
- Reports: AssetReports, InventoryReports 的 read, export 權限

### 部門主管 (DeptManager)

- Dashboard: read
- AssetManagement: AssetSearch, AssetTransfer 的 read 權限
- AssetManagement: AssetInventory 的 read, update 權限
- Reports: AssetReports 的 read, export 權限

### 財務人員 (Finance)

- Dashboard: read
- AssetManagement: AssetSearch 的 read 權限
- MasterData: 所有子模組的 read 權限
- Reports: 所有子模組的 read, export 權限

### 一般使用者 (User)

- Dashboard: read
- AssetManagement: AssetSearch 的 read 權限

### 稽核人員 (Auditor)

- Dashboard: read
- AssetManagement: 所有子模組的 read 權限
- MasterData: 所有子模組的 read 權限
- Reports: 所有子模組的 read, export 權限

## 路由結構

系統的路由結構按照功能模組組織，主要包含以下幾個部分：

### 認證相關

- `/login` - 使用者登入頁面

### 主要功能區

- `/dashboard` - 系統儀表板，顯示關鍵指標和圖表

### 資產管理模組

- `/asset-add` - 新增資產
- `/asset-maintenance` - 資產維護
- `/asset-allocation` - 資產調撥
- `/asset-query` - 資產查詢
- `/barcode-print` - 條碼列印
- `/asset-stamp` - 資產標籤

### 盤點管理模組

- `/inventory-check` - 盤點作業
- `/inventory-settings` - 盤點設定
- `/inventory-list` - 盤點清單
- `/inventory-report` - 盤點報表

### 主檔維護模組

- `/company-info` - 公司資料
- `/department-info` - 部門資料
- `/asset-location` - 資產位置
- `/asset-category` - 資產分類
- `/asset-status` - 資產狀態
- `/asset-source` - 資產來源
- `/user-role` - 使用者角色
- `/user-account` - 使用者帳號

## 頁面職責

### Dashboard

儀表板頁面顯示系統關鍵指標和統計資訊，包括：
- 標籤資產量、預維保資產、本月新增資產、即將到期排程等指標卡
- 資產分類分布和資產狀態分布的圓餅圖
- 待處理事項清單

### 資產管理模組

#### 新增資產 (AssetCreate)
- 提供資產基本資料輸入表單
- 支援批次匯入資產資料
- 資產編號自動生成機制

#### 資產維護 (AssetMaintenance)
- 查詢和編輯現有資產資料
- 記錄資產維修和保養歷史
- 設定資產維護排程

#### 資產查詢 (AssetSearch)
- 多條件資產搜尋功能
- 資產詳細資訊顯示
- 資產歷史記錄查詢

#### 條碼列印 (BarcodePrint)
- 資產條碼生成
- 批次列印條碼標籤
- 自訂條碼格式

#### 資產調撥 (AssetTransfer)
- 處理資產部門間調動
- 記錄調撥歷史
- 審批流程管理

#### 資產盤點 (AssetInventory)
- 建立盤點計畫
- 執行盤點作業
- 盤點結果分析和處理

### 主檔維護模組

#### 公司資料 (Companies)
- 管理公司基本資訊
- 多公司支援

#### 部門資料 (Departments)
- 管理部門結構和資訊
- 部門層級關係設定

#### 資產位置 (Locations)
- 管理資產存放位置
- 位置層級關係設定

#### 資產分類 (Categories)
- 管理資產分類體系
- 分類屬性設定

#### 資產狀態 (Status)
- 定義資產生命週期狀態
- 狀態流轉規則設定

#### 資產來源 (Sources)
- 管理資產取得來源
- 來源相關參數設定

### 系統管理模組

#### 使用者角色 (Roles)
- 角色定義和管理
- 角色權限設定

#### 使用者帳號 (Users)
- 使用者帳號管理
- 使用者角色分配

#### 權限設定 (Permissions)
- 細粒度權限控制
- 功能權限和資料權限設定

#### 系統設定 (SystemSettings)
- 系統參數配置
- 系統行為自訂

### 報表管理模組

#### 資產報表 (AssetReports)
- 資產統計報表
- 資產變動報表

#### 財務報表 (FinancialReports)
- 資產價值報表
- 折舊報表

#### 盤點報表 (InventoryReports)
- 盤點結果報表
- 盤盈盤虧分析

#### 自訂報表 (CustomReports)
- 報表自訂工具
- 報表參數設定

## 技術架構

- 前端框架：Angular
- UI 元件：Angular Material
- 資料視覺化：自訂 CSS 實現的圓餅圖 (使用 conic-gradient)
- 認證機制：JWT Token
- 權限控制：基於角色的訪問控制 (RBAC)

權限結構採用樹狀結構設計，每個功能節點定義了可用的操作權限 (create, read, update, delete, export)，系統根據使用者角色動態控制頁面訪問和功能使用權限。
