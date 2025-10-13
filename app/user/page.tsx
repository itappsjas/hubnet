'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import toast from 'react-hot-toast'

interface User {
  id_usr: number
  email: string
  id_role: number
  is_active: number
  role?: {
    code_role: string
  }
}

interface Role {
  id_role: number
  code_role: string
  is_active: number
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<number | ''>('')
  const [filterStatus, setFilterStatus] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    id_role: '',
    is_active: 1
  })

  const loadRoles = async () => {
    try {
      const res = await fetch('/api/roles')
      const data = await res.json()
      if (data.success) {
        setRoles(data.data)
      }
    } catch (error) {
      console.error('Error loading roles:', error)
      toast.error('Failed to load roles')
    }
  }

  const loadUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (filterRole !== '') params.append('role', filterRole.toString())
      if (filterStatus !== '') params.append('status', filterStatus.toString())

      const res = await fetch(`/api/users?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('Failed to load users')
    }
  }, [filterRole, filterStatus])

  // Load users and roles
  useEffect(() => {
    loadRoles()
    loadUsers()
  }, [loadUsers])

  // Reload users when filters change
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const openAddModal = () => {
    setIsEditMode(false)
    setCurrentUser(null)
    setFormData({
      email: '',
      password: '',
      id_role: '',
      is_active: 1
    })
    setIsModalOpen(true)
  }

  const openEditModal = (user: User) => {
    setIsEditMode(true)
    setCurrentUser(user)
    setFormData({
      email: user.email,
      password: '',
      id_role: user.id_role.toString(),
      is_active: user.is_active
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentUser(null)
    setShowPassword(false)
    setFormData({
      email: '',
      password: '',
      id_role: '',
      is_active: 1
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.id_role) {
      toast.error('Email and Role are required!')
      return
    }

    if (!isEditMode && !formData.password) {
      toast.error('Password is required for new users!')
      return
    }

    try {
      if (isEditMode && currentUser) {
        // Update user
        const res = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_usr: currentUser.id_usr,
            email: formData.email,
            password: formData.password,
            id_role: formData.id_role,
            is_active: formData.is_active
          })
        })

        const data = await res.json()
        if (data.success) {
          toast.success('User updated successfully!')
          loadUsers()
          closeModal()
        } else {
          toast.error(data.message || 'Failed to update user')
        }
      } else {
        // Create user
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            id_role: formData.id_role,
            is_active: formData.is_active
          })
        })

        const data = await res.json()
        if (data.success) {
          toast.success('User created successfully!')
          loadUsers()
          closeModal()
        } else {
          toast.error(data.message || 'Failed to create user')
        }
      }
    } catch (error) {
      toast.error('An error occurred!')
      console.error(error)
    }
  }

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/users?id_usr=${userId}`, {
          method: 'DELETE'
        })

        const data = await res.json()
        if (data.success) {
          toast.success('User deleted successfully!')
          loadUsers()
        } else {
          toast.error(data.message || 'Failed to delete user')
        }
      } catch (error) {
        toast.error('Failed to delete user!')
        console.error(error)
      }
    }
  }

  const toggleUserStatus = async (userId: number, currentStatus: number) => {
    try {
      const user = users.find(u => u.id_usr === userId)
      if (!user) return

      const newStatus = currentStatus === 1 ? 0 : 1
      
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usr: userId,
          email: user.email,
          id_role: user.id_role,
          is_active: newStatus
        })
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`User ${newStatus === 1 ? 'activated' : 'deactivated'} successfully!`)
        loadUsers()
      } else {
        toast.error(data.message || 'Failed to update user status')
      }
    } catch (error) {
      toast.error('Failed to update user status!')
      console.error(error)
    }
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === '' || user.id_role === filterRole
    const matchesStatus = filterStatus === '' || user.is_active === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  // Function to get role color styling
  const getRoleColorStyle = (roleCode: string) => {
    const code = roleCode?.toLowerCase()
    
    if (code?.includes('admin')) {
      return 'bg-red-500/20 text-red-300 border-red-400/30'
    } else if (code?.includes('view')) {
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30'
    } else if (code?.includes('airline')) {
      return 'bg-green-500/20 text-green-300 border-green-400/30'
    } else {
      return 'bg-purple-500/20 text-purple-300 border-purple-400/30'
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a2744] to-[#0f1829] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <Sidebar />
      <MobileNav />
      
      <main className="flex-1 p-6 pb-24 lg:pb-6 flex flex-col min-h-screen relative z-10 overflow-y-auto">
        {/* Header with User Info */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
            <div className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Header Title */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
                    <span className="text-lg">👥</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      User Management System
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Manage Users & Roles
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 text-sm">👤</span>
                      <div>
                        <p className="text-xs text-blue-400 font-medium">Total Users</p>
                        <p className="text-sm font-bold text-white">{users.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-400/20 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">✓</span>
                      <div>
                        <p className="text-xs text-green-400 font-medium">Active</p>
                        <p className="text-sm font-bold text-white">
                          {users.filter(u => u.is_active === 1).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 text-sm">✕</span>
                      <div>
                        <p className="text-xs text-red-400 font-medium">Inactive</p>
                        <p className="text-sm font-bold text-white">
                          {users.filter(u => u.is_active === 0).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Container */}
        <div className="flex-1 bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          {/* Filter and Controls Section */}
          <div className="space-y-4 mb-6">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-white/10">
                  📋
                </span>
                User List
              </h3>

              {/* Add User Button - Primary Action */}
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 text-sm flex items-center gap-2 justify-center sm:w-auto w-full"
              >
                <span className="text-base">➕</span>
                Add New User
              </button>
            </div>

            {/* Filters and Controls */}
            <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/30">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left side - Filters Group */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:flex-1">
                  {/* Role Filter */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Filter by Role
                    </label>
                    <select
                      value={filterRole}
                      onChange={(e) => {
                        setFilterRole(e.target.value === '' ? '' : Number(e.target.value))
                        setCurrentPage(1)
                      }}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 h-10"
                    >
                      <option value="">All Roles</option>
                      {roles.map(role => (
                        <option key={role.id_role} value={role.id_role}>
                          {role.code_role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Filter by Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value === '' ? '' : Number(e.target.value))
                        setCurrentPage(1)
                      }}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 h-10"
                    >
                      <option value="">All Status</option>
                      <option value="1">✓ Active</option>
                      <option value="0">✕ Inactive</option>
                    </select>
                  </div>

                  {/* Items per page */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Items per Page
                    </label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 h-10"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                {/* Right side - Search */}
                <div className="flex flex-col gap-1.5 lg:w-80">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Search Users
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 h-10"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    No
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Role
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr
                      key={user.id_usr}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-gray-400">
                        {startIndex + index + 1}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColorStyle(user.role?.code_role || '')}`}>
                          {user.role?.code_role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleUserStatus(user.id_usr, user.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
                            user.is_active === 1
                              ? 'bg-green-500/20 text-green-300 border-green-400/30 hover:bg-green-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30'
                          }`}
                        >
                          {user.is_active === 1 ? '✓ Active' : '✕ Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition-colors duration-200 text-xs font-medium"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id_usr)}
                            className="inline-flex items-center px-3 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition-colors duration-200 text-xs font-medium"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center">
                      <div className="flex flex-col items-center space-y-2 text-gray-400">
                        <span className="text-4xl">📭</span>
                        <span className="text-lg">
                          {searchTerm || filterRole || filterStatus !== ''
                            ? 'No users found matching your filters'
                            : 'No users available'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-4 border-t border-white/10 gap-4">
            <div className="text-sm text-gray-400">
              {filteredUsers.length > 0 ? (
                <>
                  Showing {startIndex + 1} to{' '}
                  {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{' '}
                  {filteredUsers.length} entries
                </>
              ) : (
                <>Showing 0 entries</>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-cyan-700/30 border border-slate-600/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {filteredUsers.length === 0 ? (
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm bg-cyan-700/30 text-white font-medium shadow-sm">
                    1
                  </button>
                ) : (
                  Array.from({ length: Math.max(1, Math.min(5, totalPages)) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 shadow-sm ${
                          currentPage === pageNumber
                            ? 'bg-cyan-700/30 text-white'
                            : 'bg-slate-700/30 border border-slate-600/30 text-gray-300 hover:bg-slate-700/50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })
                )}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages || 1, currentPage + 1))}
                disabled={currentPage === (totalPages || 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md border border-white/10 animate-slide-up overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-slate-800/60 to-slate-900/60 px-6 py-4 border-b border-slate-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                    <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      {isEditMode ? 'Edit User' : 'Create New User'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isEditMode ? 'Update user information' : 'Add a new user to the system'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-600/40 transition-all duration-200 text-slate-400 hover:text-cyan-300 group border border-transparent hover:border-slate-500/30"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Email Address
                    <span className="text-red-400 text-xs">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/40 backdrop-blur-sm text-white border border-slate-600/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-200 placeholder-slate-400 hover:bg-slate-700/40 hover:border-slate-500/50"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="group">
                  <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                    {!isEditMode && <span className="text-red-400 text-xs">*</span>}
                    {isEditMode && <span className="text-slate-400 text-xs bg-slate-800/60 px-2 py-1 rounded-md border border-slate-600/30">Optional - leave blank to keep current</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 pr-12 bg-slate-800/40 backdrop-blur-sm text-white border border-slate-600/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-200 placeholder-slate-400 hover:bg-slate-700/40 hover:border-slate-500/50"
                      placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
                      required={!isEditMode}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-700/50 transition-all duration-200 focus:outline-none border border-transparent hover:border-slate-500/30"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Role Select */}
                <div className="group">
                  <label htmlFor="role" className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    User Role
                    <span className="text-red-400 text-xs">*</span>
                  </label>
                  <select
                    id="role"
                    value={formData.id_role}
                    onChange={(e) => setFormData({ ...formData, id_role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/40 backdrop-blur-sm text-white border border-slate-600/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-200 hover:bg-slate-700/40 hover:border-slate-500/50"
                    required
                  >
                    <option value="" className="bg-slate-800">Choose a role</option>
                    {roles.map(role => (
                      <option key={role.id_role} value={role.id_role} className="bg-slate-800">
                        {role.code_role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Info */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Account Status
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500/15 to-green-500/15 border border-emerald-400/25 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/25 border border-emerald-400/40">
                      <svg className="w-3 h-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-emerald-200 font-semibold text-sm">Active Status</p>
                      <p className="text-emerald-300/70 text-xs">New users are automatically activated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 pt-4 border-t border-slate-600/30">
                <button
                  type="submit"
                  className="w-full group relative overflow-hidden px-6 py-3 text-cyan-300 font-semibold rounded-lg transition-all duration-200 shadow-lg border bg-cyan-500/10 hover:bg-cyan-500/15 border-cyan-400/30 hover:border-cyan-300/40 hover:shadow-cyan-500/15 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditMode 
                        ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                      } />
                    </svg>
                    <span>{isEditMode ? 'Update User' : 'Create User'}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

