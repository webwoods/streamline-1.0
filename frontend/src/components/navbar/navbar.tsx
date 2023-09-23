import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { blue, grey } from "@mui/material/colors";
import UserProfileButton from "./avatar";
import NotificationButton from "./notification";

const HEADER_HEIGHT = rem(65);
const primary = blue[600];
const secondary = grey[50];
const accent = grey[900];

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--accent-blue)",
  },

  button: {
    backgroundColor: secondary,
    color: accent,
    "&:hover": {
      backgroundColor: accent,
      color: secondary,
      transitionDelay: "120ms",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function HeaderAction() {
  const { classes } = useStyles();
  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Button className={classes.button} radius="xl" h={30}>
            DASHBOARD
          </Button>
          <Button className={classes.button} radius="xl" h={30}>
            REQUEST
          </Button>
          <Button className={classes.button} radius="xl" h={30}>
            FILES
          </Button>
        </Group>
        <Group spacing={9}>
          <UserProfileButton />
          <NotificationButton/>
        </Group>
      </Container>
    </Header>
  );
}
