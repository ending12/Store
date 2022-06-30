export let API: string

if (process.env.NODE_ENV === "development") {
  API = process.env.REACT_APP_DEVLOPMENT_API_URL!
  // API = "http://121.89.198.199:8888/"
} else if (process.env.NODE_ENV === "production") {
  API = process.env.REACT_APP_PRODUCTION_API_URL!
  // API = "http://121.89.198.199:8888/"
}
