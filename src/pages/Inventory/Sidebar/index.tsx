import React, { useState } from "react";
import clsx from "clsx";
import {
	Switch,
	Link,
	useHistory
} from "react-router-dom";
import {
	Drawer,
	AppBar,
	Toolbar,
	Divider,
	IconButton,
	ListItem,
	ListItemText,
	ListItemIcon,
	Container,
	List,
	Collapse
} from "@material-ui/core";
import { 
	ICollapse,
	ILink, 
	ILinks, 
	IRoutes, 
	setUpLinks,
	setUpRoutes
} from "./Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./useStyles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PrivateRoute from "../../../routes/PrivateRoute";
import AlertDialog from "../../../components/AlertDialog";
import { useAuth } from "../../../hooks/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const LinksSidebar = (props: { sidebar: ILink[] }) => {
	const { sidebar } = props;
	return (
		<>
			{
				sidebar?.map((link: ILink, index: number) => (
					<ListItem
						id={`${link.name.toLowerCase()}-${index}`}
						button
						component={Link}
						to={link.to}
						key={Math.random() + index}
					>
						<ListItemIcon>
							<link.icon />
						</ListItemIcon>
						<ListItemText primary={link.name} />
					</ListItem>
				))
			}
		</>
	)
}

const RenderLinksWithCollapse = (props: { collapse: ICollapse, sidebar: ILink[] }) => {
	const { collapse, sidebar } = props;
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<collapse.icon />
				</ListItemIcon>
				<ListItemText primary={collapse?.name} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<LinksSidebar sidebar={sidebar} />
				</List>
			</Collapse>
		</>
	);
}

const NestedList = (props: { links: ILinks[] }) => {
	const { links } = props;

	return (
		<>
			{
				links?.map((el: ILinks, key: number) => {
					return el?.collapse ?
						<RenderLinksWithCollapse
							key={key}
							collapse={el?.collapse}
							sidebar={el?.sidebar}
						/> :
						<LinksSidebar
							key={key}
							sidebar={el?.sidebar}
						/>
				})
			}
		</>
	);

}

const Sidebar: React.FC = () => {
	const classes = useStyles();
	const { signOut, logged } = useAuth();
	const [open, setOpen] = useState<boolean>(false);
	const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
	const history = useHistory();

	const links: ILinks[] = setUpLinks(logged?.roles);
	const routes: IRoutes[] = setUpRoutes(logged?.roles);

	const handleLogout = () => {
		signOut()
		history.push("/");
	}

	const handleDialogOpenClose = () => {
		setOpenAlertDialog(!openAlertDialog);
	}

	const handleDialogConfirm = () => {
		setOpenAlertDialog(!openAlertDialog);
		handleLogout();
	}

	const handleDrawerOpenClose = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>

			{
				openAlertDialog &&
				<AlertDialog
					titleButtonConfirm={"Sim"}
					titleButtonClose={"Não"}
					description={"Deseja realmente sair da aplicação?"}
					title={"Atenção"}
					handleDialogClose={handleDialogOpenClose}
					handleDialogConfirm={handleDialogConfirm}
					openAlertDialog={openAlertDialog}
				/>
			}

			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={clsx(classes.toolbar, open && classes.drawerClosed)}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpenClose}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerOpenClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<React.Fragment>
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						<NestedList links={links} />
						<ListItem
							button
							onClick={handleDialogOpenClose}
						>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary={"Sair"} />
						</ListItem>
					</List>
				</React.Fragment>
			</Drawer>
			<div className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Switch>
						{
							routes.map((route: IRoutes, index: number) => (
								<PrivateRoute
									key={index}
									path={route.path}
									exact={route.exact}
									children={<route.component />}
								/>
							))
						}
					</Switch>
				</Container>
			</div>
		</div>
	);
}

export default Sidebar;