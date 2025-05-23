import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex h-10 items-center justify-center rounded-md bg-[#f1f5f9] p-1 text-[#64748b] ',
			className
		)}
		{...props}
	/>
))

TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-[#f8fafc] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent data-[state=active]:bg-[#f8fafc] data-[state=active]:text-[#020817] data-[state=active]:shadow-sm data-[state=active]:border-[#e2e8f0]',
			className
		)}
		{...props}
	>
		{children}
	</TabsPrimitive.Trigger>
))

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'mt-2 rounded-md border border-[#e2e8f0] p-4 ring-offset-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2',
			className
		)}
		{...props}
	/>
))

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
