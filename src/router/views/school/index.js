// import Layout from "@/page/index/";
export default [
    {
        path: "/school",
        meta: {
            keepAlive: false
        },
        component: () => import("@/views/school/index.vue")
    }
];
