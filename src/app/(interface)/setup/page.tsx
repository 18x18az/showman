'use client'

import { useSelector } from 'react-redux'
import { selectIsSetupStage } from '@/lib/redux/slices/stageSlice/selectors'
import { redirect } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Header } from '@/components/primitives/Header'
import { Post } from '@/utils/maestro'

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: 'Event name must be at least 2 characters.'
  }),
  fields: z.array(z.object({
    name: z.string().min(2, {
      message: 'Field name must be at least 2 characters.'
    }),
    isCompetition: z.boolean()
  }))
})

function SetupForm (): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: '',
      fields: [
        { name: 'Field 1', isCompetition: true },
        { name: 'Field 2', isCompetition: true },
        { name: 'Field 3', isCompetition: true },
        { name: 'Skills 1', isCompetition: false }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'fields',
    control: form.control
  })

  function onSubmit (values: z.infer<typeof formSchema>): void {
    void Post('setup/config', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={(event) => { void form.handleSubmit(onSubmit)(event) }} className='space-y-8 xl:space-y-8 xl:mt-8'>
        <FormField
          control={form.control}
          name='eventName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input className='w-64' placeholder='Event name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>
            Fields
          </FormLabel>
          <FormDescription>
            Set up fields
          </FormDescription>
          {fields.map((field, index) => (
            <div className='flex items-center gap-3 xl:gap-6 p-1 mt-1' key={field.id}>
              <FormField
                control={form.control}
                name={`fields.${index}.isCompetition`}
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <FormControl>
                            {/* eslint-disable-next-line react/jsx-handler-names */}
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Whether this is a competition field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`fields.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className='flex gap-2 xl:gap-8 mt-2 xl:mt-4 xl:mb-4'>
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={() => append({ name: '', isCompetition: false })}
            >
              Add Field
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={() => remove(fields.length - 1)}
            >
              Remove Field
            </Button>
          </div>
        </div>
        <Button type='submit' size='lg'>Initialize</Button>
      </form>
    </Form>
  )
}

export default function Page (): JSX.Element {
  const isSetup = useSelector(selectIsSetupStage)

  if (isSetup === false) {
    redirect('/')
  }

  return (
    <>
      <Header name='Setup' description='Initial event configuration' />
      <SetupForm />
    </>
  )
}
