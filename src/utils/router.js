export const routerMap = {
  table: ()=>import('@/views/table/index'),
  icon :()=>import('@/views/icons/index'),
  upload :()=>import('@/views/uploadPerson/index'),
  menu_list:()=>import ('@/views/menu/list'),
  plist:()=>import ('@/views/person/list'),
  meeting_add:()=>import ('@/views/meeting/meeting_add'),
  meeting_set:()=>import ('@/views/meeting/meeting_set')
}
