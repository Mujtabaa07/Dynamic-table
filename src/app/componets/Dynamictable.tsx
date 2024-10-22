import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/componets/ui/table"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataItem = Record<string, any>

interface DynamicTableProps {
  data: DataItem[]
  className?: string
}

export default function DynamicTable({ data, className = '' }: DynamicTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-center p-4 bg-gray-100 rounded-md">No data available</div>
  }

  const headers = Object.keys(data[0])

  return (
    <div className={`w-full overflow-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="font-bold">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={`${index}-${header}`}>
                  {renderCellContent(item[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCellContent(content: any): React.ReactNode {
  if (typeof content === 'boolean') {
    return content ? '✅' : '❌'
  } else if (Array.isArray(content)) {
    return content.join(', ')
  } else if (typeof content === 'object' && content !== null) {
    return JSON.stringify(content)
  } else {
    return content
  }
}