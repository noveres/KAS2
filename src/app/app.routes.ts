import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [() => {
      const isLoggedIn = localStorage.getItem('token') !== null;
      return !isLoggedIn ? true : ['/dashboard'];
    }]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // canActivate: [AuthGuard]
  },
  // 資產管理路由
  {
    path: 'asset-add',
    loadComponent: () => import('./pages/asset-management/asset-add/asset-add.component').then(m => m.AssetAddComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-maintenance',
    loadComponent: () => import('./pages/asset-management/asset-maintenance/asset-maintenance.component').then(m => m.AssetMaintenanceComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-stamp',
    loadComponent: () => import('./pages/asset-management/asset-stamp/asset-stamp.component').then(m => m.AssetStampComponent),
    //canActivate: [AuthGuard]
  },
  // 主機維護路由
  {
    path: 'company-info',
    loadComponent: () => import('./pages/server-maintenance/company-info/company-info.component').then(m => m.CompanyInfoComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'department-info',
    loadComponent: () => import('./pages/server-maintenance/department-info/department-info.component').then(m => m.DepartmentInfoComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'role-list',
    loadComponent: () => import('./pages/server-maintenance/role-list/role-list.component').then(m => m.RoleListComponent),
    // canActivate: [AuthGuard]
  },
 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
