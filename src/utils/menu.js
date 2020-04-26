/**
 * 
 * @param {菜单里面的meta} data 
 */
export function getMeta(data) {

  let roles = []
  let breadcrumb;
  let meta = data;

  if (meta.roleList) {
    meta.roleList.forEach(element => {
      roles.push(element.roleName)
    });
  }

  if (meta.breadcrumb === 1) {
    breadcrumb = false
  } else {
    breadcrumb = true
  }

  meta = {
    'roles': roles,
    'title': meta.title,
    'icon': meta.icon,
    'breadcrumb': breadcrumb,
    'activeMenu': meta.activemenu
  }
  return meta;
}

/**
 * 
 * @param {获取的菜单对象} element 
 */
export function getMenu(element) {


  let children = [];
  let hidden = false;

  let meta = [];
  if (element.meta) {
    meta = getMeta(element.meta);
  }

  if (element.hidden === 1) {
    hidden = true;
  }

  //递归赋值
  if (element.children) {
     children.push(getMenu(element.children));
  }
  let menu = {
    'path': element.path,
    'component': element.component,
    'redirect': element.redirect,
    'name': element.name,
    'hidden': hidden,
    'meta': meta,
    'children': children
  }

  return menu;
}
