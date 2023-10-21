'use client'

import { Button } from "@nextui-org/button";
import styles from '@/styles/page.module.css';
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	
	return (
		<div className={styles.allCenter}>
			<div className={styles.flexCol}>
				<h1>Welcome to Stream Line</h1>
				<Button color="primary" onClick={() => router.push('/dashboard')}>Go to Procurement App</Button>
			</div>
		</div>
	);
}