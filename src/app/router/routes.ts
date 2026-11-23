//---------- Packages ----------
import type { RouteObject } from "react-router-dom";

//---------- Components ----------
import AppLayout from "@/app/layout/app-layout";

//---------- Pages ----------
import DashboardPage from "@/features/pages/dashboard-page";
import NotFoundPage from "@/features/pages/not-found-page";
import TopicDetailPage from "@/features/pages/topic-detail-page";
import TopicsPage from "@/features/pages/topics-page";

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
