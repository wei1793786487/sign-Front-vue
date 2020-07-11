export const routerMap = {
  table: ()=>import('@/views/table/index'),
  icon :()=>import('@/views/icons/index'),
  upload :()=>import('@/views/uploadPerson/index'),
  menu_list:()=>import ('@/views/menu/list'),
  plist:()=>import ('@/views/person/list'),
  meeting_add:()=>import ('@/views/form/meeting_add'),
  meeting_set:()=>('@/views/form/meeting_set')
}
