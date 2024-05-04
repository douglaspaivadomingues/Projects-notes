  const statusMap = {
    SUCCESS: 200,
    CREATED: 201,
    DELETED: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 422,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  }
const mapStatus = (status) => statusMap[status] || 500;

export default mapStatus;