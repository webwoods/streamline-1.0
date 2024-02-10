'use client'

import { Button } from '@nextui-org/react';
import { Timeline } from 'flowbite-react';

interface Props {

}

export default function ActivityTimeLine({ }: Props) {
    return (
        <Timeline
        >
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>February 2022</Timeline.Time>
                    <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                    <Timeline.Body>
                        Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                        E-commerce & Marketing pages.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>March 2022</Timeline.Time>
                    <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                    <Timeline.Body>
                        All of the pages and components are first designed in Figma and we keep a parity between the two versions
                        even as we update the project.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    );
}