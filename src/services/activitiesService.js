import http from "./httpService";

const apiEndpoint = "/activities";

export function getActivities() {
  return http.get(apiEndpoint);
}

export function createActivity(activity) {
  return http.post(apiEndpoint, activity);
}

export function updateActivity(activity) {
  const { _id } = activity;
  delete activity._id;
  return http.put(`${apiEndpoint}/${_id}`, activity);
}

export function deleteActivity(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}
