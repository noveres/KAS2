import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h1>個人設置</h1>
      
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="avatar-container">
            <img src="assets/images/default-avatar.png" alt="用戶頭像" class="user-avatar">
            <button class="change-avatar-button">更換頭像</button>
          </div>
          
          <div class="user-info-summary">
            <div class="user-name">系統管理員</div>
            <div class="user-role">系統管理員</div>
            <div class="user-id">ID: 10001</div>
          </div>
        </div>
        
        <div class="profile-main">
          <div class="profile-section">
            <h2>基本資料</h2>
            <form class="profile-form">
              <div class="form-group">
                <label for="userName">姓名</label>
                <input type="text" id="userName" value="系統管理員">
              </div>
              
              <div class="form-group">
                <label for="userEmail">電子郵件</label>
                <input type="email" id="userEmail" value="admin@kas-tech.com">
              </div>
              
              <div class="form-group">
                <label for="userPhone">聯絡電話</label>
                <input type="tel" id="userPhone" value="0912-345-678">
              </div>
              
              <div class="form-group">
                <label for="userDepartment">所屬部門</label>
                <select id="userDepartment">
                  <option value="it" selected>IT部門</option>
                  <option value="finance">財務部門</option>
                  <option value="admin">行政部門</option>
                </select>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="save-button">保存變更</button>
              </div>
            </form>
          </div>
          
          <div class="profile-section">
            <h2>修改密碼</h2>
            <form class="profile-form">
              <div class="form-group">
                <label for="currentPassword">當前密碼</label>
                <input type="password" id="currentPassword" placeholder="請輸入當前密碼">
              </div>
              
              <div class="form-group">
                <label for="newPassword">新密碼</label>
                <input type="password" id="newPassword" placeholder="請輸入新密碼">
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">確認新密碼</label>
                <input type="password" id="confirmPassword" placeholder="請再次輸入新密碼">
              </div>
              
              <div class="form-actions">
                <button type="submit" class="save-button">更新密碼</button>
              </div>
            </form>
          </div>
          
          <div class="profile-section">
            <h2>通知設置</h2>
            <form class="profile-form">
              <div class="form-group checkbox-group">
                <input type="checkbox" id="emailNotification" checked>
                <label for="emailNotification">接收電子郵件通知</label>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="assetNotification" checked>
                <label for="assetNotification">資產維護提醒</label>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="systemNotification" checked>
                <label for="systemNotification">系統更新通知</label>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="save-button">保存設置</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
    }
    
    h1 {
      margin-bottom: 20px;
      color: #333;
    }
    
    h2 {
      color: #444;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .profile-content {
      display: flex;
      gap: 30px;
    }
    
    .profile-sidebar {
      flex: 0 0 250px;
    }
    
    .profile-main {
      flex: 1;
    }
    
    .avatar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .user-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #f0f0f0;
    }
    
    .change-avatar-button {
      padding: 8px 16px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .user-info-summary {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    
    .user-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .user-role {
      color: #666;
      margin-bottom: 5px;
    }
    
    .user-id {
      font-size: 14px;
      color: #999;
    }
    
    .profile-section {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .profile-form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .form-group {
      flex: 1 0 calc(50% - 10px);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
    
    label {
      font-size: 14px;
      color: #555;
    }
    
    input, select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      width: 100%;
    }
    
    .save-button {
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .profile-content {
        flex-direction: column;
      }
      
      .profile-sidebar {
        flex: 0 0 auto;
      }
      
      .form-group {
        flex: 1 0 100%;
      }
    }
  `]
})
export class ProfileComponent {
}