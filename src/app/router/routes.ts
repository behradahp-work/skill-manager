//---------- Packages ----------
import type { RouteObject } from "react-router-dom";

//---------- Components ----------
import AppLayout from "@/app/layout/app-layout";

//---------- Pages ----------
import DashboardPage from "@/pages/dashboard-page";
import NotFoundPage from "@/pages/not-found-page";
import TopicDetailPage from "@/pages/topic-detail-page";
import TopicsPage from "@/pages/topics-page";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "topics", Component: TopicsPage },
      { path: "topics/:topicId", Component: TopicDetailPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
];

export default routes;
