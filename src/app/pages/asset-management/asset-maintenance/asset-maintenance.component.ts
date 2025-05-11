import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-maintenance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="asset-maintenance-container">
      <h1>資產維護</h1>
      
      <div class="search-bar">
        <input type="text" placeholder="搜尋資產..." class="search-input">
        <button class="search-button">搜尋</button>
      </div>
      
      <div class="asset-table-container">
        <table class="asset-table">
          <thead>
            <tr>
              <th>資產編號</th>
              <th>資產名稱</th>
              <th>類型</th>
              <th>所屬部門</th>
              <th>狀態</th>
              <th>最後維護日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A001</td>
              <td>筆記型電腦</td>
              <td>電子設備</td>
              <td>IT部門</td>
              <td><span class="status normal">正常</span></td>
              <td>2023-05-15</td>
              <td>
                <button class="action-button maintain">維護</button>
                <button class="action-button repair">送修</button>
                <button class="action-button view">查看</button>
              </td>
            </tr>
            <tr>
              <td>A002</td>
              <td>辦公桌</td>
              <td>辦公家具</td>
              <td>行政部門</td>
              <td><span class="status warning">需維護</span></td>
              <td>2022-10-20</td>
              <td>
                <button class="action-button maintain">維護</button>
                <button class="action-button repair">送修</button>
                <button class="action-button view">查看</button>
              </td>
            </tr>
            <tr>
              <td>A003</td>
              <td>投影機</td>
              <td>電子設備</td>
              <td>財務部門</td>
              <td><span class="status repair">修繕中</span></td>
              <td>2023-01-10</td>
              <td>
                <button class="action-button maintain" disabled>維護</button>
                <button class="action-button repair" disabled>送修</button>
                <button class="action-button view">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="maintenance-form-container" id="maintenanceForm">
        <h2>資產維護記錄</h2>
        <form class="maintenance-form">
          <div class="form-group">
            <label for="assetId">資產編號</label>
            <input type="text" id="assetId" value="A001" readonly>
          </div>
          
          <div class="form-group">
            <label for="assetName">資產名稱</label>
            <input type="text" id="assetName" value="筆記型電腦" readonly>
          </div>
          
          <div class="form-group">
            <label for="maintenanceDate">維護日期</label>
            <input type="date" id="maintenanceDate">
          </div>
          
          <div class="form-group">
            <label for="maintenanceType">維護類型</label>
            <select id="maintenanceType">
              <option value="">請選擇維護類型</option>
              <option value="regular">定期維護</option>
              <option value="repair">故障修復</option>
              <option value="upgrade">升級更新</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="maintenanceStaff">維護人員</label>
            <input type="text" id="maintenanceStaff" placeholder="請輸入維護人員姓名">
          </div>
          
          <div class="form-group">
            <label for="maintenanceCost">維護費用</label>
            <input type="number" id="maintenanceCost" placeholder="請輸入維護費用">
          </div>
          
          <div class="form-group full-width">
            <label for="maintenanceDescription">維護描述</label>
            <textarea id="maintenanceDescription" rows="3" placeholder="請輸入維護描述"></textarea>
          </div>
          
          <div class="form-group full-width">
            <label for="maintenanceResult">維護結果</label>
            <textarea id="maintenanceResult" rows="3" placeholder="請輸入維護結果"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-button">取消</button>
            <button type="submit" class="submit-button">保存</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .asset-maintenance-container {
      padding: 20px;
    }
    
    h1, h2 {
      margin-bottom: 20px;
      color: #333;
    }
    
    h2 {
      margin-top: 30px;
    }
    
    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      align-items: center;
    }
    
    .search-input {
      flex: 1;
      max-width: 400px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .search-button {
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .asset-table-container {
      overflow-x: auto;
      margin-bottom: 30px;
    }
    
    .asset-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .asset-table th, .asset-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .asset-table th {
      background-color: #f8f8f8;
      font-weight: bold;
    }
    
    .asset-table tbody tr:hover {
      background-color: #f5f5f5;
    }
    
    .status {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    
    .status.normal {
      background-color: #d4edda;
      color: #155724;
    }
    
    .status.warning {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .status.repair {
      background-color: #f8d7da;
      color: #dc3545;
    }
    
    .action-button {
      padding: 5px 10px;
      margin-right: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .action-button.maintain {
      background-color: #4a90e2;
      color: white;
    }
    
    .action-button.repair {
      background-color: #f0ad4e;
      color: white;
    }
    
    .action-button.view {
      background-color: #6c757d;
      color: white;
    }
    
    .action-button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .maintenance-form-container {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
    }
    
    .maintenance-form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .form-group {
      flex: 1 0 calc(33.333% - 14px);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .form-group.full-width {
      flex: 1 0 100%;
    }
    
    label {
      font-size: 14px;
      color: #555;
    }
    
    input, select, textarea {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    input[readonly] {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
    
    textarea {
      resize: vertical;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      width: 100%;
    }
    
    .cancel-button, .submit-button {
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .cancel-button {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      color: #333;
    }
    
    .submit-button {
      background-color: #4a90e2;
      color: white;
      border: none;
    }
    
    @media (max-width: 768px) {
      .form-group {
        flex: 1 0 100%;
      }
    }
  `]
})
export class AssetMaintenanceComponent {
}