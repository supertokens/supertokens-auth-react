import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: "**",
                component: AuthComponent,
            },
        ],
    },
    { path: "**", component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
