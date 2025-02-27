import { basePermissions } from '@/settings'
import api from '@/api'
import tree from '@/temp/my_tree.json';

export async function getUserInfo() {
  const res = await api.getUser()
  const { id, username, profile, roles, currentRole } = res.data || {}
  return {
    id,
    username,
    avatar: profile?.avatar,
    nickName: profile?.nickName,
    gender: profile?.gender,
    address: profile?.address,
    email: profile?.email,
    roles,
    currentRole,
  }
}

export async function getPermissions() {
  let asyncPermissions = []
  try {
    // const res = await api.getRolePermissions()
    // asyncPermissions = res?.data || []
    // console.log(tree)
    asyncPermissions = tree.data || [];
  } catch (error) {
    console.error(error)
  }
  // return basePermissions.concat(asyncPermissions)
  return asyncPermissions;
}


