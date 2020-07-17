export const routerMap = {
  icon :()=>import('@/views/icons/index'),
  upload :()=>import('@/views/uploadPerson/index'),
  menu_list:()=>import ('@/views/menu/list'),
  plist:()=>import ('@/views/person/list'),
  meeting_add:()=>import ('@/views/meeting/add'),
  meeting_set:()=>import ('@/views/meeting/set'),
  edit:()=>import ('@/views/meeting/edit'),
  meeting_mselect:()=>import ('@/views/sign/add'),
  log_set:()=>import ('@/views/log/list')
}
