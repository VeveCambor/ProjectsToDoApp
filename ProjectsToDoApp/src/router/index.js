import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/WelcomePage.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsPage.vue')
  },
  {
    path: '/project/:id',
    name: 'projectDetail',
    component: () => import('../views/ProjectDetailPage.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksPage.vue')
  },
  {
    path: '/task/:id',
    name: 'taskDetail',
    component: () => import('../views/TaskDetailPage.vue')
  },
  {
    path: '/persons',
    name: 'persons',
    component: () => import('../views/PersonsPage.vue')
  },
  {
    path: '/person/:id',
    name: 'personDetail',
    component: () => import('../views/PersonDetailPage.vue')
  },
  {
    path: '/project-form',
    name: 'projectFormAdd',
    component: () => import('../views/ProjectFormPage.vue')
  },
  {
    path: '/project-form/:id',
    name: 'projectFormEdit',
    component: () => import('../views/ProjectFormPage.vue')
  },
  {
    path: '/task-form',
    name: 'taskFormAdd',
    component: () => import('../views/TaskFormPage.vue') // $route.params neobsahuje nic
  },
  {
    path: '/task-form-project/:projectid',
    name: 'taskFormAddProject',
    component: () => import('../views/TaskFormPage.vue') // $route.params.projectid ... to je id projektu, do kterého task přidáváme
  },
  {
    path: '/task-form/:id',
    name: 'taskFormEdit',
    component: () => import('../views/TaskFormPage.vue') // $route.params.id .... to je id editovaného tasku
  },



  {
    path: '/person-form',
    name: 'personFormAdd',
    component: () => import('../views/PersonFormPage.vue')
  },
  {
    path: '/person-form/:id',
    name: 'personFormEdit',
    component: () => import('../views/PersonFormPage.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
