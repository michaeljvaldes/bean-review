from rest_framework import pagination


class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        count = self.page.paginator.count
        next = None
        if self.page.paginator.num_pages > self.page.number:
            next = self.page.next_page_number()
        return pagination.Response({
            'count': count,
            'next': next,
            'results': data,
        })
