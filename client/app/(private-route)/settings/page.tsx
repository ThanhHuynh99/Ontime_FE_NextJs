"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input";
import ColorSelector from "@/components/admin-panel/color-selector";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  version: z.string().min(2, {
    message: "version must be at least 2 characters.",
  }),
  color: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dataSetFromDate: z.date({
    required_error: "A data set from date is required.",
  }),
  radiousMax: z.number(),
  activeUserCode: z.string(),
  inActiveUserCode: z.string(),
  minutesCheckInAllowedByDefault: z.number(),
  minutesCheckOutAllowedByDefault: z.number(),
  useFaceLiveness: z.boolean(),
  useFaceAuth: z.boolean(),
  useGPSTracking: z.boolean(),
  enableDeviceForcer: z.boolean(),
  ciLateCode: z.string(),
  coEarlyCode: z.string(),
  noCOCode: z.string(),
  notWorkingCode: z.string(),
  offCode: z.string(),
  unScheduledCode: z.string(),
})

export default function SettingsPage() {  
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      version: "1.0.0",
      color: "Black",
      dataSetFromDate: new Date(),
      radiousMax: 10000,
      activeUserCode: "",
      inActiveUserCode: "",
      minutesCheckInAllowedByDefault: 0,
      minutesCheckOutAllowedByDefault: 0,
      useFaceLiveness: false,
      useFaceAuth: false,
      useGPSTracking: false,
      enableDeviceForcer: false,
      ciLateCode: "",
      coEarlyCode: "",
      noCOCode: "",
      notWorkingCode: "",
      offCode: "",
      unScheduledCode: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (    
    <>
      <ContentLayout breadcrumb={breadcrumb}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold">App & System</h3>
                <div className="flex flex-wrap w-full gap-3">
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>App version</FormLabel>
                          <FormControl>
                            <Input placeholder="0" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> 
                  <div className="basis-full md:flex-1">
                  <FormField
                    control={form.control}
                    name="dataSetFromDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col h-full justify-between">
                        <FormLabel>Data set from date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>             
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>App color</FormLabel>
                          <ColorSelector name={field.value} onValueChange={field.onChange}/>
                          <FormMessage />
                        </FormItem>
                      )}
                    >
                    </FormField>
                  </div>  
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="radiousMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bán kính tối đa cho phép CICO (m)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>             
                </div>
                <div className="flex flex-wrap w-full gap-3">
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="activeUserCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ký hiệu trạng thái người dùng đang hoạt động</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="inActiveUserCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ký hiệu trạng thái người dùng ngưng hoạt động</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="minutesCheckInAllowedByDefault"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số phút cho phép check-in trước giờ kế hoạch</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="minutesCheckOutAllowedByDefault"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số phút cho phép check-out sau giờ kế hoạch</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold">Futures on mobile app</h3>   
                <div className="flex flex-wrap w-full gap-3">
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="useFaceLiveness"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Bật tính năng kiểm tra hình thật</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="useFaceAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Bật tính năng xác thực ảnh</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="useGPSTracking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Bật tính năng theo dõi hành trình</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-full md:flex-1">
                    <FormField
                      control={form.control}
                      name="enableDeviceForcer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Bật tính năng kiểm tra khác thiết bị</FormLabel>                            
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>                 
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold">Config Check-In/Check-Out</h3>   
                <div className="flex flex-wrap w-full gap-3">
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="ciLateCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mã check-in trễ</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="basis-full md:flex-1">
                  <FormField
                      control={form.control}
                      name="coEarlyCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã check-out sớm</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-full md:flex-1">
                  <FormField
                      control={form.control}
                      name="noCOCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã không check-out</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-full md:flex-1">
                  <FormField
                      control={form.control}
                      name="notWorkingCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã không làm việc</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-full gap-3">
                  <div className="basis-full md:flex-1">
                    <FormField
                        control={form.control}
                        name="offCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mã nghỉ ca</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>                  
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="basis-full md:flex-1">
                  <FormField
                      control={form.control}
                      name="unScheduledCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã không lịch làm việc</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>                  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="hidden md:flex-1 md:block"></div>
                  <div className="hidden md:flex-1 md:block"></div>
                </div>
              </div>
            </div>                        
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ContentLayout>      
    </>
  );
}
