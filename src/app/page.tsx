"use client"

import React, { useState } from 'react'
import { Button } from "@/app/componets/ui/buttons"
import { Input } from "@/app/componets/ui/input"
import { Textarea } from "@/app/componets/ui/textarea"
import { Label } from "@/app/componets/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/app/componets/ui/alret"
import { AlertCircle } from "lucide-react"
import DynamicTable from '../app/componets/Dynamictable'

export default function InteractiveTablePage() {
  const [inputData, setInputData] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<Record<string, any>[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value)
    setError(null)
  }

  const generateTable = () => {
    try {
      const parsedData = JSON.parse(inputData)
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error('Input must be a non-empty array of objects')
      }
      if (!parsedData.every(item => typeof item === 'object' && item !== null)) {
        throw new Error('All items in the array must be objects')
      }
      setTableData(parsedData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input')
      setTableData([])
    }
  }

  const sampleData = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
    { id: 3, name: "Bob Johnson", age: 35, city: "Chicago" }
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Interactive Dynamic Table Generator</h1>
      
      <div className="space-y-2">
        <Label htmlFor="data-input">Enter JSON data for the table:</Label>
        <Textarea
          id="data-input"
          placeholder="Enter JSON array of objects here..."
          value={inputData}
          onChange={handleInputChange}
          className="h-40"
        />
      </div>

      <Button onClick={generateTable}>Generate Table</Button>

      <div className="space-y-2">
        <Label>Sample Data:</Label>
        <Input 
          readOnly 
          value={JSON.stringify(sampleData)} 
          className="font-mono text-sm"
        />
        <Button 
          variant="outline" 
          onClick={() => setInputData(JSON.stringify(sampleData, null, 2))}
        >
          Use Sample Data
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {tableData.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Generated Table</h2>
          <DynamicTable data={tableData} className="shadow-md rounded-lg" />
        </div>
      )}
    </div>
  )
}