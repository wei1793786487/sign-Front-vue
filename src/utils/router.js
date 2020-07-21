export const routerMap = {
  icon :()=>import('@/views/icons/index'),
  upload :()=>import('@/views/uploadPerson/index'),
  menu_list:()=>import ('@/views/menu/list'),
  plist:()=>import ('@/views/person/list'),
  meeting_add:()=>import ('@/views/meeting/add'),
  meeting_set:()=>import ('@/views/meeting/set'),
  edit:()=>import ('@/views/meeting/edit'),
  meeting_mselect:()=>import ('@/views/sign/add'),
  log_set:()=>import ('@/views/log/list'),
  meeting_sign:()=>import ('@/views/sign/list'),
  user_list:()=>import('@/views/user/list'),
  user_add:()=>import('@/views/user/add'),
  user_edit:()=>import('@/views/user/edit'),
  role_list:()=>import ('@/views/role/list'),
  role_add:()=>import ('@/views/role/add'),
  role_edit:()=>import('@/views/role/edit')
}
