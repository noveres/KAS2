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
    path: 'asset-query',
    loadComponent: () => import('./pages/asset-management/asset-query/asset-query.component').then(m => m.AssetQueryComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-stamp',
    loadComponent: () => import('./pages/asset-management/asset-stamp/asset-stamp.component').then(m => m.AssetStampComponent),
    //canActivate: [AuthGuard]
  },
  // 主件維護路由
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
    path: 'asset-location',
    loadComponent: () => import('./pages/server-maintenance/asset-location/asset-location.component').then(m => m.AssetLocationComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-category',
    loadComponent: () => import('./pages/server-maintenance/asset-category/asset-category.component').then(m => m.AssetCategoryComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-status',
    loadComponent: () => import('./pages/server-maintenance/asset-status/asset-status.component').then(m => m.AssetStatusComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'asset-source',
    loadComponent: () => import('./pages/server-maintenance/asset-source/asset-source.component').then(m => m.AssetSourceComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'user-role',
    loadComponent: () => import('./pages/server-maintenance/user-role/user-role.component').then(m => m.UserRoleComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'user-account',
    loadComponent: () => import('./pages/server-maintenance/user-account/user-account.component').then(m => m.UserAccountComponent),
    // canActivate: [AuthGuard]
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
